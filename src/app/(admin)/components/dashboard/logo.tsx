import Image from "next/image";
export default function LogoAdmin() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Image src={"/fav.png"} alt="logo-admin" width={50} height={50} className="h-5 w-5" />
      </div>
      <h2 className="text-base font-semibold">RPLFASTRACK</h2>
    </div>
  );
}
