const YoutubeForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input name="username" type="text" id="username" />

        <label htmlFor="email">Email</label>
        <input name="email" type="email" id="email" />

        <label htmlFor="channel">Channel</label>
        <input name="channel" type="text" id="channel" />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
