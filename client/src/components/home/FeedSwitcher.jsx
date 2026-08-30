import { HOME_FEEDS } from '@/store/slices/homeSlice.js'
import { cn } from '@/lib/utils'

export const FEED_OPTIONS = [
    { id: HOME_FEEDS.forYou, label: 'For you' },
    { id: HOME_FEEDS.latest, label: 'Latest' },
    { id: HOME_FEEDS.following, label: 'Following' },
]

const FeedSwitcher = ({ feed, onChange }) => {
    return (
        <div
            role="tablist"
            aria-label="Home feed"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1"
        >
            {FEED_OPTIONS.map((option) => {
                const selected = option.id === feed;
                return (
                    <button
                        key={option.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        data-feed-option={option.id}
                        onClick={() => onChange(option.id)}
                        className={cn(
                            'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                            selected
                                ? 'bg-white text-black'
                                : 'text-white/70 hover:bg-white/10 hover:text-white',
                        )}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default FeedSwitcher;
