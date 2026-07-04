/** A thin section divider with a soft light pulse sweeping across it. */
export default function Divider() {
  return (
    <div className="relative mx-auto h-px w-full max-w-[1100px] overflow-hidden px-6 lg:px-10">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-line2 to-transparent lg:inset-x-10" />
      <div className="divider-scan absolute inset-y-0 left-0 h-px w-1/4 bg-gradient-to-r from-transparent via-cyan/55 to-transparent" />
    </div>
  );
}
