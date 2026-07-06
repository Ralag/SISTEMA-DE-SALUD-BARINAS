import { Dhis2DataValueSet, Dhis2TrackedEntityInstance, Dhis2ApiResponse } from '../types/dhis2';

/**
 * Servicio de integración con DHIS2.
 * Esta capa abstrae las llamadas a la API de DHIS2 para facilitar la futura conexión real.
 */
class Dhis2Service {
  private baseUrl: string;
  private authHeader: string;
  
  // Mocks flag to avoid actual network requests while in pure frontend prototyping
  private useMock: boolean = true; 

  constructor() {
    this.baseUrl = (import.meta as any).env?.VITE_DHIS2_BASE_URL || 'https://play.dhis2.org/demo/api';
    
    // In a real scenario, this would use OAuth2 or a secure backend proxy to avoid exposing credentials.
    // For now, we simulate basic auth or a token.
    const username = (import.meta as any).env?.VITE_DHIS2_USERNAME || 'admin';
    const password = (import.meta as any).env?.VITE_DHIS2_PASSWORD || 'district';
    this.authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  }

  /**
   * Envía un conjunto de datos agregados (Ej: DSP04 - Productividad Semanal/Mensual)
   */
  async sendDataValueSet(payload: Dhis2DataValueSet): Promise<Dhis2ApiResponse> {
    if (this.useMock) {
      console.log('[DHIS2 MOCK] Sending DataValueSet:', payload);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            httpStatus: 'OK',
            httpStatusCode: 200,
            status: 'OK',
            message: 'Import successful',
            response: {
              responseType: 'ImportSummary',
              status: 'SUCCESS',
              imported: payload.dataValues.length,
              updated: 0,
              deleted: 0,
              ignored: 0,
              importOptions: {}
            }
          });
        }, 800);
      });
    }

    const response = await fetch(`${this.baseUrl}/dataValueSets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`DHIS2 API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Registra un caso individual o evento tracker (Ej: EPI-10 - Morbilidad individual)
   */
  async sendTrackedEntity(payload: Dhis2TrackedEntityInstance): Promise<Dhis2ApiResponse> {
    if (this.useMock) {
      console.log('[DHIS2 MOCK] Sending TrackedEntity:', payload);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            httpStatus: 'OK',
            httpStatusCode: 200,
            status: 'OK',
            message: 'Import successful',
            response: {
              responseType: 'ImportSummary',
              status: 'SUCCESS',
              imported: 1,
              updated: 0,
              deleted: 0,
              ignored: 0,
              importOptions: {}
            }
          });
        }, 600);
      });
    }

    // Endpoint for tracker data
    const response = await fetch(`${this.baseUrl}/tracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      },
      body: JSON.stringify({ trackedEntities: [payload] })
    });

    if (!response.ok) {
      throw new Error(`DHIS2 Tracker Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const dhis2Service = new Dhis2Service();
