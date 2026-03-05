interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function AuthLayout({ left, right }: Props) {
  return (
    <div className="loginWrapper">
      <div className="leftSide">{left}</div>
      <div className="rightSide">{right}</div>
    </div>
  );
}