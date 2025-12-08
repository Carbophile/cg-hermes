import { getDict, type Lang } from "@l10n/dict";

interface RootPageProps {
	params: Promise<{ lang: string }>;
}

const RootPage = async ({ params }: RootPageProps) => {
	const { lang } = (await params) as { lang: Lang };
	const dict = await getDict(lang);

	return <p className="font-bold text-3xl underline">{dict.hello}</p>;
};

export default RootPage;
