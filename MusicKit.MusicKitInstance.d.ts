declare namespace MusicKit {
    interface SeekSeconds {
        BACK: number;
        FORWARD: number;
      }
      
    /**
     * This object provides access to a player instance, and through the player
     * instance, access to control playback.
     */
    interface MusicKitInstance {
        /**
         * An instance of the MusicKit API.
         */
        readonly api: API;
        /**
         * An instance of the MusicKit API.
         */
        readonly bitrate: PlaybackBitrate;
         /**
         * The current playback duration.
         */
         readonly currentPlaybackDuration: number;
         /**
          * The current playback progress.
          */
         readonly currentPlaybackProgress: number;
         /**
          * The current position of the playhead.
          */
         readonly currentPlaybackTime: number;
         /**
          * No description available.
          */
         readonly currentPlaybackTimeRemaining: number;
         /**
         * A Boolean value indicating whether the user has authenticated and
         * authorized the application for use.
         */
        readonly isAuthorized: boolean;
         /**
         * A Boolean value indicating whether the player is currently playing.
         */
         readonly isPlaying: boolean;
         /**
         * The currently-playing media item, or the media item, within an queue,
         * that you have designated to begin playback.
         */
        readonly nowPlayingItem: MediaItem;
        /**
         * The index of the now playing item in the current playback queue.
         */
        readonly nowPlayingItemIndex?: number | undefined;
        /**
         * The speed of playback, which is set directly on the HTMLMediaElement as the HTMLMediaElement.playbackRate property. Default is 1.0.
         */
        playbackRate: number;
        /**
         * The current playback state of the music player.
         */
        readonly playbackState: PlaybackStates;
        /**
         * When a user with a valid Apple Music subscription authorizes your app, MusicKit will allow full playback of content from the Apple Music catalog.
         * If the app does not have user authorization, then playback is restricted to non-DRM preview assets, which are snippets of the full media.
         * You can set this property to true to restrict MusicKit to playing only the preview assets, even when full playback is available.
         * Setting this to false will not force full playback, but will instead return to the default behavior of determining what asset to play based on the user’s authorization and Apple Music Subscription status. 
         */
        previewOnly: boolean;
        /**
         * The current playback queue of the music player.
         */
        readonly queue: Queue;
        /**
         * Indicates whether the current playback queue is empty.
         */
        queueIsEmpty: boolean;
        /**
         * The current repeat mode of the music player.
         */
        repeatMode: PlayerRepeatMode;
        /**
         * While playing a MediaItem, seedSeconds will be an Object with properties BACK and FORWARD,
         * which represent the number of seconds that the play head will be moved backwards or forwards when calling seekBackward or seekForward, respectively.
         */
        seekSeconds: SeekSeconds | undefined;
        /**
         * The current shuffle mode of the music player.
         */
        shuffleMode: PlayerShuffleMode;
        /**
         * The current storefront for the configured MusicKit instance.
         */
        readonly storefrontId: string;
        /**
         * If creating a custom video player, you can set this property to a DOM Element of type HTMLVideoElement, which is the element type of a <video> tag.
         * MusicKit will then use that element for video playback, for instance Music Videos.
         */
        videoContainerElement: HTMLVideoElement | undefined;
        /**
         * A number indicating the current volume of the music player.
         */
        volume: number;

        /**
         * The developer token to identify yourself as a trusted developer and
         * member of the Apple Developer Program.
         */
        readonly developerToken: string;
        /**
         * A user token used to access personalized Apple Music content.
         */
        readonly musicUserToken: string;

        /**
         * Add an event listener for a MusicKit instance by name.
         *
         * @param name The name of the event.
         * @param callback The callback function to invoke when the event occurs.
         */
        addEventListener<T extends keyof Events>(name: T, callback: (event: Events[T]) => any): void;
        /**
         * Returns a promise containing a music user token when a user has
         * authenticated and authorized the app.
         */
        authorize(): Promise<string>;
        /**
         * Begins playing the media item at the specified index in the queue.
         *
         * @param index The queue index to begin playing media.
         */
        changeToMediaAtIndex(index: number): Promise<number>;
        /**
         * Begins playing a specific MediaItem in the queue immediately.
         *
         * @param descriptor The descriptor can be a MediaItem instance or the id of a specific item in the queue.
         */
        changeToMediaItem(descriptor: MediaItem | string): Promise<void>;
        /**
         * Changes the user storefront.
         * 
         * @param storefrontId The id of the storefront to use as the {{storefrontId}} value in the path parameter of the Passthrough API method.
         */
        changeUserStorefront(storefrontId: string): Promise<void>;
        /**
         * Clears the queue of MediaItems. Does not stop playback or clear the nowPlayingItem.
         */
        clearQueue(): Promise<Queue>;
        /**
         * Cross-browser method to close a full-screen element, when applicable.
         */
        exitFullscreen(): Promise<void>;
        /**
         * Sets the volume to 0, storing the previous value for use with unmute() later, if necessary.
         */
        mute(): void;
        /**
         * Pauses playback of the nowPlayingItem.
         */
        pause(): void;
        /**
         * Initiates playback of the nowPlayingItem.
         */
        play(): void;
        /**
         * Inserts the MediaItem(s) defined by QueueOptions at the position indicated in the current queue.
         * @param position The index position in the queue to insert the new MediaItem(s) at. Position 0 is the first item in the queue.
         * @param options The options used to set the playback queue.
         * @returns A promise that resolves with the updated queue or void if playback is not supported.
         */
        playAt(position: number, options: SetQueueOptions): Promise<Queue | void>;
        /**
         * Inserts the MediaItem(s) defined by QueueOptions after the last MediaItem in the current queue.
         * @param options The options used to set the playback queue.
         * @returns A promise that resolves with the updated queue or void if playback is not supported.
         */
        playLater(options: SetQueueOptions): Promise<Queue | void>;
        /**
         * Inserts the MediaItem(s) defined by QueueOptions immediately after the nowPlayingItem in the current queue.
         * @param options The options used to set the playback queue.
         * @param clear Optionally clear out the remaining queue items.
         */
        playNext(options: SetQueueOptions, clear?: boolean): Promise<void>;
        /**
         * Removes an event listener for a MusicKit instance by name.
         *
         * @param name The name of the event.
         * @param callback The callback function to remove.
         */
        removeEventListener<T extends keyof Events>(name: T, callback: (event: Events[T]) => any): void;
        /**
         * Cross-browser method to take an element full-screen, where supported. Useful for creating custom controller UI.
         * @param element The DOM Node that you intend to make full-screen.
         */
        requestFullscreen(element: HTMLElement): Promise<void>;
        /**
         * Seeks the current play head backwards by a predetermined number of a seconds.
         * The number of seconds can be determined for the current track by referencing seekSeconds.BACK.
         */
        seekBackward(): Promise<void>;
        /**
         * Seeks the current play head forward by a predetermined number of a seconds.
         * The number of seconds can be determined for the current track by referencing seekSeconds.FORWARD.
         */
        seekForward(): Promise<void>;
        /**
         * Sets the play head to a specified time within the nowPlayingItem.
         *
         * @param time The time to set as the playback point.
         */
        seekToTime(time: number): Promise<void>;
        /**
         * Sets the current playback Queue to an Apple Music catalog resource or list of songs.
         *
         * @param options The option used to set the playback queue.
         * @returns A promise that resolves with the updated queue or void if playback is not supported.
         */
        setQueue(options: SetQueueOptions): Promise<Queue | void>;
        /**
         * Starts playback of the next media item in the playback queue.
         */
        skipToNextItem(): Promise<void>;
        /**
         * Starts playback of the previous media item in the playback queue.
         */
        skipToPreviousItem(): Promise<void>;
        /**
         * Stops playback of the media player.
         */
        stop(): Promise<void>;
        /**
         * Unauthorizes the app for the current user.
         */
        unauthorize(): Promise<void>;
        /**
         * Unmute playback volume, resetting it to the value it was at before muting.
         */
        unmute(): Promise<void>;
    }
}
