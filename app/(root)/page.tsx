import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview ready with AI-Powered Practice &amp; Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions &amp; get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm: w-full">
        <Link href="/interview">Start an interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="hero image" width={400} height={400} className="max-sm:hidden"/>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>

        <div className="interviews-section">
          <p>You haven&apos;t taken any interviews yet</p>
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
      <h2>Take an interview</h2>
      <div className="interviews-section">
        <p>There are no interviews available</p>
      </div>
      </section>
    </>
  );
};

export default page;
