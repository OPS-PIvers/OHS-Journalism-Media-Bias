export type Role = 'student' | 'teacher';

export interface NavLinkProps {
  to: string;
  icon: string;
  label: string;
  fillIcon?: boolean;
}

export interface Report {
  timestamp: string | Date;
  student: string;
  url: string;
  sourceName: string;
  author: string;
  bias: number;
  reliability: number;
  evidence: string;
  wordCount: number;
  xp: number;
  status: string;
}

// Global Google Apps Script definition
declare global {
  interface Window {
    google: {
      script: {
        run: {
          withSuccessHandler: (callback: (response: any) => void) => {
            withFailureHandler: (callback: (error: any) => void) => any;
          };
          withFailureHandler: (callback: (error: any) => void) => {
            withSuccessHandler: (callback: (response: any) => void) => any;
          };
          submitReport: (data: any) => void;
          getRecentReports: () => void;
        };
      };
    };
  }
}