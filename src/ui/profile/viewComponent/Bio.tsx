function Bio({ bio }: { bio: string }) {
  return (
    <div className="text-center text-base text-ink-400">
      <p>{bio}</p>
    </div>
  );
}

export default Bio;
