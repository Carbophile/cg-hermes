import type { Dictionary } from "@l10n/Dict";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

interface FooterProps {
	dict: Dictionary;
}

const Footer = ({ dict }: FooterProps) => {
	const socials = [
		{
			href: "https://www.linkedin.com/company/103351222",
			icon: FaLinkedin,
			name: dict.contact.linkedin,
		},
	];

	return (
		<footer className="bg-white dark:bg-gray-900">
			<div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
				<div className="flex justify-center gap-x-6 md:order-2">
					{socials.map((item) => (
						<a
							className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
							href={item.href}
							key={item.name}
						>
							<span className="sr-only">{item.name}</span>
							<item.icon aria-hidden="true" className="size-6" />
						</a>
					))}
				</div>
				<p className="mt-8 text-center text-gray-600 text-sm/6 md:order-1 md:mt-0 dark:text-gray-400">
					<Link href="https://github.com/Carbophile/cg-hermes/blob/main/NOTICE.md">
						{dict.copyright}
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
