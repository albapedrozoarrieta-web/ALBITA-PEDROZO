import { ApprenticeProfile, UserProgress } from '../types/induction';

export const SPREADSHEET_TITLE = 'SENA - Registro de Aprendices e Inducción (Acuerdo 0009 de 2024)';
export const SHEET_NAME = 'Aprendices_Inducción';

export interface SheetApprenticeRow {
  rowNumber?: number;
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  studyProgram: string;
  fichaNumber: string;
  regional: string;
  trainingCenter: string;
  levelXp: string;
  completedModules: string;
  progressPercent: string;
  examScore: string;
  certifiedStatus: string;
  certificateCode: string;
  reglamentoVigente: string;
}

export const HEADERS = [
  'Fecha y Hora de Registro',
  'Nombre Completo del Aprendiz',
  'Tipo de Documento',
  'Número de Documento',
  'Correo Electrónico',
  'Programa de Formación',
  'Número de Ficha',
  'Regional SENA',
  'Centro de Formación',
  'Nivel y Puntos XP',
  'Módulos Aprobados (de 5)',
  'Progreso de Inducción (%)',
  'Nota Examen Final (%)',
  'Estado de Certificación',
  'Código Verificación Certificado',
  'Normativa Aplicada'
];

export const STORAGE_KEY_SHEET_ID = 'sena_drive_sheet_id';
export const STORAGE_KEY_SHEET_LINK = 'sena_drive_sheet_link';

export function getSavedSpreadsheetInfo(): { id: string; name: string; webViewLink: string } | null {
  try {
    const id = localStorage.getItem(STORAGE_KEY_SHEET_ID);
    const link = localStorage.getItem(STORAGE_KEY_SHEET_LINK);
    if (id && link) {
      return { id, name: SPREADSHEET_TITLE, webViewLink: link };
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

export function saveSpreadsheetInfo(id: string, link: string) {
  try {
    localStorage.setItem(STORAGE_KEY_SHEET_ID, id);
    localStorage.setItem(STORAGE_KEY_SHEET_LINK, link);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Searches Google Drive for an existing spreadsheet with the designated title.
 * If none exists, creates a new one and initializes the header row.
 * Automatically saves the found ID to avoid repeated searches.
 */
export async function getOrCreateInductionSpreadsheet(accessToken: string): Promise<{
  id: string;
  name: string;
  webViewLink: string;
  isNew: boolean;
}> {
  // Check fast cache first
  const cached = getSavedSpreadsheetInfo();
  if (cached) {
    try {
      // Quick verify with metadata
      const verifyRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${cached.id}?fields=spreadsheetId,properties.title`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (verifyRes.ok) {
        return {
          id: cached.id,
          name: cached.name,
          webViewLink: cached.webViewLink,
          isNew: false
        };
      }
    } catch {
      // Fallback to fresh search
    }
  }

  // 1. Search in Drive
  const query = encodeURIComponent(
    `name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
  );
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)&spaces=drive`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    const errorBody = await searchRes.text();
    throw new Error(`Error al consultar Google Drive: ${searchRes.status} ${errorBody}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    const existing = searchData.files[0];
    const link = existing.webViewLink || `https://docs.google.com/spreadsheets/d/${existing.id}/edit`;
    saveSpreadsheetInfo(existing.id, link);
    return {
      id: existing.id,
      name: existing.name,
      webViewLink: link,
      isNew: false
    };
  }

  // 2. Create new spreadsheet via Google Sheets API
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME,
            gridProperties: {
              frozenRowCount: 1
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error al crear la hoja de cálculo: ${createRes.status} ${errText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  saveSpreadsheetInfo(spreadsheetId, webViewLink);

  // 3. Add header row
  const appendHeaderUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    `${SHEET_NAME}!A1:P1`
  )}:append?valueInputOption=USER_ENTERED`;

  await fetch(appendHeaderUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values: [HEADERS]
    })
  });

  // 4. Style header row with SENA green styling
  try {
    const batchUpdateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
    await fetch(batchUpdateUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: createdData.sheets[0].properties.sheetId,
                startRowIndex: 0,
                endRowIndex: 1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.223, green: 0.662, blue: 0.0 }, // #39A900 SENA Green
                  horizontalAlignment: 'CENTER',
                  textFormat: {
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    bold: true,
                    fontSize: 10
                  }
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
            }
          }
        ]
      })
    });
  } catch (formatErr) {
    console.warn('Could not apply header styling, continuing:', formatErr);
  }

  return {
    id: spreadsheetId,
    name: SPREADSHEET_TITLE,
    webViewLink,
    isNew: true
  };
}

/**
 * Fetch all registered apprentices from the sheet
 */
export async function getRegisteredApprentices(
  accessToken: string,
  spreadsheetId: string
): Promise<SheetApprenticeRow[]> {
  const range = encodeURIComponent(`${SHEET_NAME}!A2:P`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al leer los datos de la hoja: ${res.status} ${err}`);
  }

  const data = await res.json();
  const rows: any[][] = data.values || [];

  return rows.map((row, idx) => ({
    rowNumber: idx + 2,
    timestamp: row[0] || '',
    fullName: row[1] || '',
    documentType: row[2] || '',
    documentNumber: row[3] || '',
    email: row[4] || '',
    studyProgram: row[5] || '',
    fichaNumber: row[6] || '',
    regional: row[7] || '',
    trainingCenter: row[8] || '',
    levelXp: row[9] || '',
    completedModules: row[10] || '',
    progressPercent: row[11] || '',
    examScore: row[12] || '',
    certifiedStatus: row[13] || '',
    certificateCode: row[14] || '',
    reglamentoVigente: row[15] || 'Acuerdo 0009 de 2024'
  }));
}

/**
 * Synchronize apprentice induction record to the Google Sheet.
 * If the apprentice (by Document Number) is already in the sheet, updates their row.
 * Otherwise, appends a new record.
 */
export async function syncApprenticeRecord(
  accessToken: string,
  spreadsheetId: string,
  profile: ApprenticeProfile,
  progress: UserProgress,
  userEmail?: string
): Promise<{ action: 'updated' | 'appended'; rowNumber: number }> {
  // First, retrieve existing rows to find if documentNumber exists
  const existingRecords = await getRegisteredApprentices(accessToken, spreadsheetId);
  const existingIdx = existingRecords.findIndex(
    r => r.documentNumber.trim() === profile.documentNumber.trim()
  );

  const now = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const progressPercent = Math.round((progress.completedModules.length / 5) * 100);
  const examScoreText =
    progress.finalExamScore !== null ? `${progress.finalExamScore}%` : 'Pendiente';
  const certifiedStatusText =
    progress.finalExamScore !== null && progress.finalExamScore >= 80
      ? 'CERTIFICADO'
      : progress.completedModules.length === 5
      ? 'Examen Pendiente'
      : 'En Proceso';

  const rowValues = [
    now,
    profile.fullName,
    profile.documentType,
    profile.documentNumber,
    userEmail || 'No especificado',
    profile.studyProgram,
    profile.fichaNumber,
    profile.regional,
    profile.trainingCenter,
    `Nivel ${progress.level} (${progress.xp} XP)`,
    `${progress.completedModules.length}/5`,
    `${progressPercent}%`,
    examScoreText,
    certifiedStatusText,
    progress.certificateCode || 'Pendiente',
    'Acuerdo 0009 de 2024 (SENA)'
  ];

  if (existingIdx !== -1) {
    // Update existing row
    const rowNum = existingRecords[existingIdx].rowNumber || existingIdx + 2;
    const updateRange = encodeURIComponent(`${SHEET_NAME}!A${rowNum}:P${rowNum}`);
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=USER_ENTERED`;

    const updateRes = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Error al actualizar fila ${rowNum}: ${updateRes.status} ${err}`);
    }

    return { action: 'updated', rowNumber: rowNum };
  } else {
    // Append new row
    const appendRange = encodeURIComponent(`${SHEET_NAME}!A:P`);
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${appendRange}:append?valueInputOption=USER_ENTERED`;

    const appendRes = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    });

    if (!appendRes.ok) {
      const err = await appendRes.text();
      throw new Error(`Error al insertar fila nueva: ${appendRes.status} ${err}`);
    }

    const appendData = await appendRes.json();
    return { action: 'appended', rowNumber: existingRecords.length + 2 };
  }
}

/**
 * Automatically ensures the sheet exists and synchronizes the apprentice record silently in the background
 */
export async function autoSyncApprenticeRecord(
  accessToken: string,
  profile: ApprenticeProfile,
  progress: UserProgress,
  userEmail?: string
): Promise<{
  action: 'updated' | 'appended';
  rowNumber: number;
  spreadsheetId: string;
  webViewLink: string;
  syncedAt: string;
}> {
  const sheet = await getOrCreateInductionSpreadsheet(accessToken);
  const syncResult = await syncApprenticeRecord(
    accessToken,
    sheet.id,
    profile,
    progress,
    userEmail
  );

  const syncedAt = new Date().toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    ...syncResult,
    spreadsheetId: sheet.id,
    webViewLink: sheet.webViewLink,
    syncedAt
  };
}
