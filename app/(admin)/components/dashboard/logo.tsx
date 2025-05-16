import Image from "next/image";
export default function LogoAdmin() {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <Image
          src={"/logo-admin.png"}
          alt="logo-admin"
          width={50}
          height={50}
          className="w-6 h-6"
        />
      </div>
      <h2 className="font-semibold text-[#008fff]">RPLFASTRACK</h2>
    </div>
  );
}
