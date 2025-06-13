import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useRef, useState } from 'react';
import { useClose } from '../hooks/useClose';
import { Text } from '../../ui/text/Text';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';
import { ArrowButton } from '../../ui/arrow-button/ArrowButton';
import { Button } from '../../ui/button/Button';

import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import { ArticleStyleSettings } from '../app/App';

type Props = {
	pageState: ArticleStyleSettings;
	onChangePageStyle: (state: ArticleStyleSettings) => void;
};

export const ArticleParamsForm = ({ pageState, onChangePageStyle }: Props) => {
	const [openState, setOpenState] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStyleSettings>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);

	useClose({
		isOpen: openState,
		onClose: () => setOpenState(false),
		rootRef: formRef,
	});

	const toggleSidebar = () => {
		setOpenState((prev) => {
			if (!prev) setFormState(pageState);
			return !prev;
		});
	};

	const handleSelectChange = (
		field: keyof ArticleStyleSettings,
		selected: OptionType
	) => {
		setFormState({
			...formState,
			[field]: selected,
		});
	};

	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		onChangePageStyle(formState);
		setOpenState(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onChangePageStyle(defaultArticleState);
		setOpenState(false);
	};

	return (
		<>
			<ArrowButton isOpen={openState} onClick={toggleSidebar} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: openState,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) =>
							handleSelectChange('fontFamilyOption', selected)
						}
					/>

					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							handleSelectChange('fontSizeOption', selected)
						}
					/>

					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							handleSelectChange('fontColor', selected)
						}
					/>

					<Separator />

					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							handleSelectChange('backgroundColor', selected)
						}
					/>

					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							handleSelectChange('contentWidth', selected)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							htmlType='button'
							onClick={handleReset}
						/>
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
