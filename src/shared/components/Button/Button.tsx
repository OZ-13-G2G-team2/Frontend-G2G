import React from 'react';
import styles from '@shared/components/Button/Button.module.scss';

// 리터럴 유니언 타입 사용 (규칙 준수)
export type ButtonSize = 'sm' | 'md' | 'lg';

// 객체 타입은 interface로 정의 (규칙 준수)
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isDisabled = false,
  size = 'md',
  type = 'button',
}) => {
  const handleClick = () => {
    if (isDisabled) return;
    onClick?.();
  };
  
 // 클래스명 구성
  const classNames = [
    styles.button,
    styles[`size_${size}`], // 사이즈별 클래스 적용
    isDisabled ? styles.disabled : '',
  ].join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
