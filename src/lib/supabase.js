import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ═══════════════════════════════════════════════════════════════════════════
// RSVP Functions
// ═══════════════════════════════════════════════════════════════════════════

export const submitRSVP = async (rsvpData) => {
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
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{
      ...contactData,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};
