import heroBook2 from '../assets/images/eat-that-frog.jpg';
import frame3 from '../assets/images/frames/Frame-11-10.png';
import frame4 from '../assets/images/frames/Frame-12-10.png';
import frame6 from '../assets/images/frames/Frame-13-10.png';
import frame1 from '../assets/images/frames/Frame-14-10.png';
import frame5 from '../assets/images/frames/Frame-17-8.png';
import frame2 from '../assets/images/frames/Frame-3-12.png';
import heroBook1 from '../assets/images/power-of-habit.jpg';
import Layout from '../layout/Layout';

export default function Homepage() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh_-_80px)] relative">
        <img
          src={frame1}
          alt="frame1"
          className="absolute top-16 left-5 w-60"
        />
        <img
          src={frame2}
          alt="frame1"
          className="absolute top-36 right-2/3 w-60"
        />
        <img
          src={frame3}
          alt="frame2"
          className="absolute bottom-20 left-20 w-60"
        />
        <img
          src={frame4}
          alt="frame1"
          className="absolute bottom-48 left-[500px] w-60"
        />
        <section className="w-3/5 pl-20">
          <h1 className="text-7xl">Welcome</h1>
          <h1 className="text-7xl py-5">To</h1>
          <h1 className="text-7xl">Bookworm</h1>
          <p className="text-4xl pt-5">Read books like bookworm!</p>
        </section>

        <section className="w-2/5 z-0">
          <div className="bg-primary h-full min-h-[50vh] relative">
            <div className="absolute -top-24 left-1/2 z-10">
              <img src={heroBook1} alt="Power of habit" className="w-4/5" />
            </div>
            <div className="absolute top-24 left-20 z-1">
              <img
                src={heroBook2}
                alt="Eat that frog"
                className="w-4/5 max-w-sm"
              />
            </div>
            <img
              src={frame5}
              alt="frame1"
              className="absolute -top-16 -left-20 w-60"
            />
            <img
              src={frame6}
              alt="frame1"
              className="absolute -bottom-16 right-5 w-60"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}
