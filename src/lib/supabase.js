import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Demo mode when Supabase is not configured
const isDemoMode = !supabaseUrl || !supabaseAnonKey;

export const supabase = isDemoMode 
  ? null 
  : createClient(supabaseUrl, supabaseAnonKey);

// Console warning for demo mode
if (isDemoMode) {
  console.warn('⚠️ Supabase not configured - running in demo mode. Forms will simulate submission.');
}

// ═══════════════════════════════════════════════════════════════════════════
// RSVP Functions
// ═══════════════════════════════════════════════════════════════════════════

export const submitRSVP = async (rsvpData) => {
  if (isDemoMode) {
    console.log('📝 Demo: RSVP submitted', rsvpData);
    return [{ id: Date.now(), ...rsvpData }];
  }
  
  const { data, error } = await supabase
    .from('rsvp_responses')
    .insert([{
      ...rsvpData,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getRSVPResponses = async () => {
  if (isDemoMode) return [];
  
  const { data, error } = await supabase
    .from('rsvp_responses')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════
// Guestbook Functions
// ═══════════════════════════════════════════════════════════════════════════

export const submitGuestbookEntry = async (entry) => {
  if (isDemoMode) {
    console.log('📝 Demo: Guestbook entry submitted', entry);
    return [{ id: Date.now(), ...entry }];
  }
  
  const { data, error } = await supabase
    .from('guestbook_entries')
    .insert([{
      ...entry,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getGuestbookEntries = async () => {
  if (isDemoMode) return [];
  
  const { data, error } = await supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════
// Music Wishes Functions
// ═══════════════════════════════════════════════════════════════════════════

export const submitMusicWish = async (wish) => {
  if (isDemoMode) {
    console.log('📝 Demo: Music wish submitted', wish);
    return [{ id: Date.now(), ...wish }];
  }
  
  const { data, error } = await supabase
    .from('music_wishes')
    .insert([{
      ...wish,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getMusicWishes = async () => {
  if (isDemoMode) return [];
  
  const { data, error } = await supabase
    .from('music_wishes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════
// Photo Upload Functions
// ═══════════════════════════════════════════════════════════════════════════

export const savePhotoUpload = async (photoData) => {
  if (isDemoMode) {
    console.log('📝 Demo: Photo upload saved', photoData);
    return [{ id: Date.now(), ...photoData }];
  }
  
  const { data, error } = await supabase
    .from('guest_photos')
    .insert([{
      ...photoData,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getGuestPhotos = async () => {
  if (isDemoMode) return [];
  
  const { data, error } = await supabase
    .from('guest_photos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════
// Contact Functions
// ═══════════════════════════════════════════════════════════════════════════

export const submitContactForm = async (contactData) => {
  if (isDemoMode) {
    console.log('📝 Demo: Contact form submitted', contactData);
    return [{ id: Date.now(), ...contactData }];
  }
  
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      ...contactData,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

// ═══════════════════════════════════════════════════════════════════════════
// Archive Functions (for post-wedding photos)
// ═══════════════════════════════════════════════════════════════════════════

export const getArchivePhotos = async (category = null, limit = 20, offset = 0) => {
  if (isDemoMode) return [];
  
  let query = supabase
    .from('archive_photos')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
