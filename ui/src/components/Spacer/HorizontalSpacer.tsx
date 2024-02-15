type Props = {
  marginLeft?: number;
  marginRight?: number;
};

const HorizontalSpacer = (props: Props) => {
  const { marginLeft, marginRight } = props;
  return <div style={{ marginLeft: `${marginLeft}px`, marginRight: `${marginRight}px`, borderLeft: ' 1px solid #747474' }} />;
};

export default HorizontalSpacer;
