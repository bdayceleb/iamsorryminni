// Analytics tracker with Google Sheets integration
// Sends events to a Google Apps Script web app

// ⚠️ REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRiaP4SgMQSXAPkXuKSn2sU1VmIpN49omhQklZupmCeA8GE73RcG_AHxTomrDtMe64cg/exec';

const STORAGE_KEY = 'minni_interactions';

// Get all tracked events from localStorage (backup)
export const getEvents = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Track a new event - sends to Google Sheets
export const trackEvent = async (eventName, metadata = {}) => {
    const timestamp = new Date().toISOString();
    const timeLocal = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const eventData = {
        event: eventName,
        timestamp: timestamp,
        timeLocal: timeLocal,
        userAgent: navigator.userAgent,
        ...metadata
    };

    // Save to localStorage as backup
    const events = getEvents();
    events.push(eventData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

    // Send to Google Sheets (non-blocking)
    try {
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });
    } catch (error) {
        console.log('Failed to send to Google Sheets:', error);
    }

    console.log('📊 Tracked:', eventData);
    return eventData;
};

// Get summary of all events
export const getEventSummary = () => {
    const events = getEvents();
    return {
        totalEvents: events.length,
        events: events.map(e => ({
            event: e.event,
            time: e.timeLocal
        }))
    };
};

// Clear all events (for testing)
export const clearEvents = () => {
    localStorage.removeItem(STORAGE_KEY);
};
