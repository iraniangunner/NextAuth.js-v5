import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";

export const ErrorCard = () => {
  return (
    <Card>
      <CardHeader>OOps something went wrong!!!</CardHeader>
      <CardContent>
        <Link href="/auth/login">Back to login page</Link>
      </CardContent>
    </Card>
  );
};
