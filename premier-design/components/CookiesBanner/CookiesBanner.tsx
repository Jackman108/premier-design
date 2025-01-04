'use client'
import React, {useEffect, useState} from "react";
import styles from "./CookiesBanner.module.css";
import {Paper} from "../../interface/Paper.props";
import TextViewer from "../TextViewer/TextViewer";
import Image from "next/image";

const CheckmarkIcon = '/checkmark.svg';

const CookiesBanner = ({papers}: { papers: Paper[] }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const privacyPolicy = papers.find(paper => paper.shortTitle === 'privacy-policy');

    useEffect(() => {
        try {
            const cookiesAccepted = localStorage.getItem("cookiesAccepted");
            setIsVisible(cookiesAccepted !== "true" && cookiesAccepted !== "false");
        } catch (error) {
            console.error("Ошибка при доступе к localStorage:", error);
        }
    }, []);

    const handleAction = (accepted: boolean) => {
        try {
            localStorage.setItem("cookiesAccepted", accepted ? "true" : "false");
        } catch (error) {
            console.error("Ошибка при записи в localStorage:", error);
        }
        setIsVisible(false);
    };
    const handlePrivacyPolicyClick = () => {
        setShowPrivacyPolicy(true);
    };

    if (!isVisible) return null;

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
            {showPrivacyPolicy && privacyPolicy && (
                <TextViewer
                    title={privacyPolicy.title || ""}
                    text={privacyPolicy.content || ""}
                    image={privacyPolicy.image || ""}
                    showModal={showPrivacyPolicy}
                    setShowModal={setShowPrivacyPolicy}
                />
            )}
        </div>
    );
};

export default CookiesBanner;
