'use client';

import { type FC, useId } from 'react';
import styles from './CollapsibleContainer.module.css';
import { CollapsibleContainerProps } from '@shared/ui/estimate-modal/interface/EstimateModal.props';
import { useCollapsibleContainer } from '@shared/ui/estimate-modal/hooks/useCollapsibleContainer';

const CollapsibleContainer: FC<CollapsibleContainerProps> = ({
	items,
	activeItem,
	activeLabel,
	onItemClick,
	groupLabel,
}) => {
	const { containerRef, isCollapsed, handleToggleCollapse, handleSelectItem } = useCollapsibleContainer();
	const listPanelId = useId();

	return (
		<div className={styles.collapse_container} ref={containerRef}>
			<button
				type="button"
				onClick={handleToggleCollapse}
				className={styles.collapse_header}
				aria-expanded={!isCollapsed}
				aria-controls={listPanelId}
			>
				{groupLabel ? <span className={styles.visuallyHidden}>{groupLabel}.</span> : null}
				<span>{activeLabel}</span>
				<span className={isCollapsed ? styles.arrow_right : styles.arrow_down} aria-hidden>
					{'<'}
				</span>
			</button>
			{!isCollapsed && (
				<div className={styles.collapse_body} id={listPanelId}>
					{/*
					 * Активный вариант уже в заголовке — в списке только переключение на другие, без дублирования.
					 */}
					{items
						.filter((item) => item.value !== activeItem)
						.map((item) => (
							<button
								type="button"
								key={item.value}
								className={styles.inactive}
								onClick={handleSelectItem(onItemClick, item.value)}
							>
								{item.label}
							</button>
						))}
				</div>
			)}
		</div>
	);
};

export default CollapsibleContainer;
