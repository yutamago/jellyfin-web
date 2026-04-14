/**
 * Helpers for inspecting and normalising playback state across player types.
 */

export const PlaybackState = {
    Idle: 'Idle',
    Buffering: 'Buffering',
    Playing: 'Playing',
    Paused: 'Paused',
    Stopped: 'Stopped',
    Error: 'Error'
};

/**
 * Returns true if the given state string represents an active (non-idle) session.
 * @param {string} state
 * @returns {boolean}
 */
export function isActiveState(state) {
    return state === PlaybackState.Playing || state === PlaybackState.Paused;
}

/**
 * Maps a raw player readyState integer (HTMLMediaElement.readyState) to a
 * PlaybackState string.
 * @param {number} readyState
 * @returns {string}
 */
export function readyStateToPlaybackState(readyState) {
    if (readyState === 0) return PlaybackState.Idle;
    if (readyState <= 2) return PlaybackState.Buffering;
    return PlaybackState.Playing;
}
