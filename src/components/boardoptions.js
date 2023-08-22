import '../index.css';

export default function BoardOptions({handler}) {
  return (
    <form onSubmit={(e) => {e.preventDefault(); handler(e.target);}}>
      <div>
        <label> Width:
          <input type="text" name="width" defaultValue="10" size="1"/>
        </label>
        <label> Height:
          <input type="text" name="height" defaultValue="10" size="1"/>
        </label>
        <label> Mine Density:
          <input type="text"
                 name="mine_density"
                 defaultValue="0.2"
                 size="1"
                 placeholder="< 1"/>
        </label>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
}
