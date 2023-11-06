function MatchFastGame({ id }) {
  return <>{id}</>;
}

export const getServerSideProps = (context) => {
  const { id } = context.params;

  return { props: { id } };
};

export default MatchFastGame;
