import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useEffect, useRef } from 'react';

import { Text } from '../../ui/text/Text';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';
import { ArrowButton } from '../../ui/arrow-button/ArrowButton';
import { Button } from '../../ui/button/Button';

import { OptionType } from 'src/constants/articleProps';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { ArticleStyleSettings } from 'src/index';

type Props = {
	openState: boolean;
	onToggleSidebar: () => void;
	onCloseSidebar: () => void;
	formState: ArticleStyleSettings;
	onChange: (state: ArticleStyleSettings) => void;
	onSubmit: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	openState,
	onToggleSidebar,
	onCloseSidebar,
	formState,
	onChange,
	onSubmit,
	onReset,
}: Props) => {
	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const sidebar = formRef.current;
			if (!sidebar) return;

			if (openState && !sidebar.contains(event.target as Node)) {
				onCloseSidebar();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openState, onCloseSidebar]);
	// обновление одного поля
	const handleSelectChange = (
		field: keyof ArticleStyleSettings,
		selected: OptionType
	) => {
		onChange({
			...formState,
			[field]: selected,
		});
	};

	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		onSubmit();
	};

	return (
		<>
			<ArrowButton isOpen={openState} onClick={onToggleSidebar} />
			<aside
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
							onClick={onReset}
						/>

						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
