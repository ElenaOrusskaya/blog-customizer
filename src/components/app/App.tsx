import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export interface ArticleStyleSettings {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
}

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStyleSettings>(defaultArticleState);

	return (
		<div
			className={styles.main}
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
				pageState={pageState}
				onChangePageStyle={setPageState}
			/>
			<Article />
		</div>
	);
};
