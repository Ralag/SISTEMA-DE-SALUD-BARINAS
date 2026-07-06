export interface Dhis2OrgUnit {
  id: string;
  name: string;
  level: number;
}

export interface Dhis2DataElement {
  id: string;
  name: string;
  valueType: 'NUMBER' | 'INTEGER_ZERO_OR_POSITIVE' | 'TEXT' | 'BOOLEAN';
}

export interface Dhis2DataValueSet {
  dataSet: string;
  completeDate: string;
  period: string;
  orgUnit: string;
  dataValues: Array<{
    dataElement: string;
    categoryOptionCombo?: string;
    value: string | number;
  }>;
}

export interface Dhis2TrackedEntityInstance {
  trackedEntityType: string;
  orgUnit: string;
  attributes: Array<{
    attribute: string;
    value: string;
  }>;
  enrollments?: Array<{
    program: string;
    enrollmentDate: string;
    incidentDate: string;
    orgUnit: string;
    events: Array<{
      programStage: string;
      orgUnit: string;
      eventDate: string;
      status: 'ACTIVE' | 'COMPLETED' | 'VISITED' | 'SCHEDULE' | 'OVERDUE' | 'SKIPPED';
      dataValues: Array<{
        dataElement: string;
        value: string;
      }>;
    }>;
  }>;
}

export interface Dhis2ApiResponse {
  httpStatus: string;
  httpStatusCode: number;
  status: 'OK' | 'ERROR' | 'WARNING';
  message: string;
  response?: {
    responseType: string;
    status: string;
    imported: number;
    updated: number;
    deleted: number;
    ignored: number;
    importOptions: any;
    importSummaries?: any[];
  };
}
