import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export interface ArticleStyleSettings {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [pageState, setPageState] =
		useState<ArticleStyleSettings>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStyleSettings>(defaultArticleState);

	function toggleSidebar() {
		setIsSidebarOpen((prev) => {
			if (!prev) {
				setFormState(pageState);
			}
			return !prev;
		});
	}

	function closeSidebar() {
		setIsSidebarOpen(false);
	}

	function handleSubmit() {
		setPageState(formState);
		closeSidebar();
	}

	function handleReset() {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				openState={isSidebarOpen}
				onCloseSidebar={closeSidebar}
				onToggleSidebar={toggleSidebar}
				formState={formState}
				onChange={setFormState}
				onSubmit={handleSubmit}
				onReset={handleReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
