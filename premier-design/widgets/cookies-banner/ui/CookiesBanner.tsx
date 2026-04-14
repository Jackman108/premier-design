'use client'
import React from "react";
import styles from "./CookiesBanner.module.css";
import {Paper} from "@features/papers/interface/Paper.props";
import Image from "next/image";
import {usePaperNavigation} from "@features/papers/hooks/usePaperNavigation";
import {useModalState} from "@shared/hooks/useModalState";
import {useCookiesBanner, usePrivacyPolicy} from "../hooks/useCookiesBanner";

const CheckmarkIcon = '/checkmark.svg';

const CookiesBanner = ({papers}: { papers: Paper[] }) => {
    const {isOpen, closeModal, openModal} = useModalState(false);
    const privacyPolicy = papers.find(paper => paper.shortTitle === 'privacy-policy');
    const {handlePaperClick} = usePaperNavigation();

    const {handleAction} = useCookiesBanner(openModal, closeModal);
    const { handlePrivacyPolicyClick } = usePrivacyPolicy(privacyPolicy || { shortTitle: '' }, handlePaperClick);

    if (!isOpen) return null;

    return (
        <div className={styles.cookies}>
            <div className={styles.container}>
                <div className={styles.cookiesLeft}>
                    <h2 className={styles.cookiesTitle}>Ваша конфиденциальность важна для нас</h2>
                    <p className={styles.cookiesContent}>
                        Мы используем cookie-файлы для улучшения удобства просмотра и
                        предоставления наиболее подходящего персонального контента для вас.
                    </p>
                    <p className={styles.cookiesContent}>
                        <button
                            onClick={handlePrivacyPolicyClick}
                            className={styles.link}
                            aria-label="Открыть Политику конфиденциальности"
                        >
                            Политика конфиденциальности
                        </button>
                    </p>
                </div>
                <div className={styles.cookiesRight}>
                    <button
                        className={`${styles.btn} ${styles.accent}`}
                        onClick={() => handleAction(true)}
                        aria-label="Принять все куки"
                    >
                        <Image
                            src={CheckmarkIcon}
                            alt="Checkmark"
                            className={styles.checkboxIcon}
                            width={19}
                            height={14}
                        />
                        <span>Принять все</span>
                    </button>
                    <button className={`${styles.btn} ${styles.white}`} onClick={() => handleAction(false)}
                            aria-label="Отклонить все куки">
                        Отклонить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiesBanner;
