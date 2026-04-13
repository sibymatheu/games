import { Link } from "react-router-dom";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useSoundStore } from "/@/store/soundStore";

export const Header: React.FC = () => {
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <header className="w-full bg-bg-base/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Games
          </span>
        </Link>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute game sounds" : "Mute game sounds"}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-200 text-sm font-medium cursor-pointer"
        >
          {isMuted ? (
            <HiVolumeOff className="text-text-muted text-lg" />
          ) : (
            <HiVolumeUp className="text-secondary text-lg" />
          )}
          <span className="text-text-muted">{isMuted ? "Unmute" : "Mute"}</span>
        </button>
      </div>
    </header>
  );
};
