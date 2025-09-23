import { Contact, Contribution } from '@/lib/types';

export async function submitContact(contact: Omit<Contact, 'status'>) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact');
  }

  return response.json();
}

export async function submitContribution(contribution: Omit<Contribution, 'status' | 'has_files'>) {
  const response = await fetch('/api/contributions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contribution),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contribution');
  }

  return response.json();
}