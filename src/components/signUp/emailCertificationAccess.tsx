import '@/components/signUp/emailCertification.scss'
import { ROUTE_PATHS } from '@/constants/route'
import Button from '@/shared/components/button'
import { useNavigate } from 'react-router-dom'
function EmailCertificationAccess() {
  const navigate = useNavigate()

  return (
    <div className="email-certification-box">
      <div className="email-form-title">이메일 인증</div>
      <div className="text-box">
        <p>이메일 인증이 완료되었습니다</p>
        <p>로그인을 진행해주세요!</p>
        <Button
          variant="filled"
          size="xlg"
          onClick={() => navigate(ROUTE_PATHS.LOGIN.INDEX)}
          className="email-btn-style"
        >
          로그인하러 가기
        </Button>
      </div>
    </div>
  )
}

export default EmailCertificationAccess
