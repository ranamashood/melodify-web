interface Props {
  sockets: string[];
}

const SocketsList = ({ sockets }: Props) => {
  return (
    <div>
      {sockets.map((socket, index) => (
        <div key={index}>{socket}</div>
      ))}
    </div>
  );
};

export default SocketsList;
