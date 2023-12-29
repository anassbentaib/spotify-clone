import Button from "@/components/Button/Button";

interface HeaderProps {
  onFilter: (item: string) => void;
  activeFilter: string;
}

const Header: React.FC<HeaderProps> = ({ onFilter, activeFilter }) => {
  return (
    <div className=" items-center w-full box-shadow-md space-x-3 box min-h-[100px]
    hidden sm:hidden md:hidden 2xl:flex xl:flex">
      <Button
        onClick={() => onFilter("playlist")}
        bgColor
        outline={!activeFilter || activeFilter !== "playlist"}
        label="Playlists"
        small
      />
      <Button
        onClick={() => onFilter("artist")}
        bgColor
        outline={activeFilter !== "artist"}
        label="Artists"
        small
      />
      <Button
        onClick={() => onFilter("album")}
        bgColor
        outline={activeFilter !== "album"}
        label="Albums"
        small
      />
    </div>
  );
};

export default Header;
