function CustomTitles({
  tag = 'h6',
  size = 12,
  text = '~',
  pos = 'left',
  shadow = '',
  customClass = '',
}) {
  const TagComponent = tag;
  const position = () => {
    switch (pos) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
        return 'text-center';
      default:
        return '';
    }
  };
  const resultSize = () => {
    switch (size) {
      case 12:
        return 'text-xs';
      case 14:
        return 'text-sm';
      case 18:
        return 'text-lg';
      case 20:
        return 'text-xl';
      case 24:
        return 'text-2xl';
      case 30:
        return 'text-3xl';
      case 36:
        return 'text-4xl';
      case 48:
        return 'text-5xl';
      default:
        return 'text-xs';
    }
  };

  return (
    <>
      <TagComponent
        style={{
          textShadow: shadow ? shadow : '',
        }}
        className={`font-AntonRegular text-gray-300  ${position()} ${resultSize()} ${customClass}`}>
        {text}
      </TagComponent>
    </>
  );
}

export default CustomTitles;
