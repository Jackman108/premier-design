'use client'
import React, {useEffect} from "react";
import styles from "./CookiesBanner.module.css";
import {Paper} from "../../interface/Paper.props";
import Image from "next/image";
import {usePaperNavigation} from "../../hooks/usePaperNavigation";
import {useModalState} from "../../hooks/useModalState";

const CheckmarkIcon = '/checkmark.svg';

const CookiesBanner = ({papers}: { papers: Paper[] }) => {
    const {isOpen, closeModal, openModal} = useModalState(false);
    const privacyPolicy = papers.find(paper => paper.shortTitle === 'privacy-policy');
    const {handlePaperClick} = usePaperNavigation();

    useEffect(() => {
        try {
            const cookiesAccepted = localStorage.getItem("cookiesAccepted");
            if (cookiesAccepted === "false") {
                openModal();
            } else if (cookiesAccepted !== "true") {
                openModal();
            }
        } catch (error) {
            console.error("Ошибка при доступе к localStorage:", error);
        }
    }, [openModal]);

    const handleAction = (accepted: boolean) => {
        try {
            localStorage.setItem("cookiesAccepted", accepted ? "true" : "false");
        } catch (error) {
            console.error("Ошибка при записи в localStorage:", error);
        }
        closeModal();
    };

    const handlePrivacyPolicyClick = async () => {
        if (privacyPolicy) {
            try {
                await handlePaperClick(privacyPolicy.shortTitle);
            } catch (error) {
                console.error("Ошибка при переходе к политике конфиденциальности:", error);
            }
        }
    };

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
                        <button onClick={handlePrivacyPolicyClick} className={styles.link}>
                            Политика конфиденциальности
                        </button>
                    </p>
                </div>
                <div className={styles.cookiesRight}>
                    <button className={`${styles.btn} ${styles.accent}`} onClick={() => handleAction(true)}>
                        <Image
                            src={CheckmarkIcon}
                            alt="Checkmark"
                            className={styles.checkboxIcon}
                            width={19}
                            height={14}
                        />
                        <span>Принять все</span>
                    </button>
                    <button className={`${styles.btn} ${styles.white}`} onClick={() => handleAction(false)}>
                        Отклонить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiesBanner;
