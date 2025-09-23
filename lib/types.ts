export interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved' | 'in-progress';
}

export interface Contribution {
  sign_name: string;
  language: string;
  category: string;
  description: string;
  regional_variation?: string;
  contributor_name: string;
  contributor_email: string;
  status: 'pending' | 'approved' | 'rejected';
  has_files: boolean;
  file_ids?: string[]; // Array of file record IDs from the files collection
}