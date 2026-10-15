import { socialLinks } from "@/lib/social";

export default function SocialLinks({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="text-plum transition-colors hover:text-bloom"
          >
            <Icon size={22} />
          </a>
        </li>
      ))}
    </ul>
  );
}
