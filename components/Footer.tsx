import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-plum/10 py-10 text-center text-sm text-plum">
      <p className="font-display text-lg">T Luxe Balloon & Event Decor</p>
      <SocialLinks className="mt-5 justify-center" />
      <p className="mt-2 opacity-70">© {new Date().getFullYear()}</p>
    </footer>
  );
}
