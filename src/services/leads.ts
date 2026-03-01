import { pb } from '@/lib/pocketbase';
import type { LeadPayload } from './telegram';

export interface Lead extends LeadPayload {
  id: string;
  status: 'new' | 'contacted' | 'closed';
  created: string;
}

export async function saveLeadToPocketBase(payload: LeadPayload): Promise<Lead> {
  const data = {
    name: payload.name,
    phone: payload.phone,
    message: payload.message ?? '',
    package_type: payload.packageType ?? '',
    status: 'new',
    source: typeof window !== 'undefined' ? window.location.pathname || '/' : '',
    lang: payload.lang ?? '',
  };
  return pb.collection('leads').create<Lead>(data);
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead> {
  return pb.collection('leads').update<Lead>(id, { status });
}
