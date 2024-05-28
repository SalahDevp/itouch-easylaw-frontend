"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupremeCourtSearchForm from "./forms/SupremeCourtSearchForm";
import ConstitutionSearchForm from "./forms/ConstitutionSearchForm";
import ConseilSearchForm from "./forms/ConseilSearchForm";

import { useRouter } from "next/navigation";
import LawSearchForm from "./forms/LawSearchForm";

export function SearchTab({
  query,
}: {
  query: { search_type: string | undefined };
}) {
  const router = useRouter();
  return (
    <Tabs
      onValueChange={(value) => {
        router.push(`/search?search_type=${value}`, {
          scroll: false,
        });
      }}
      defaultValue={query.search_type || "supreme_court"}
      className="pt-8"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="conseil">الإجتهاد القضائي</TabsTrigger>
        <TabsTrigger value="laws">الجريدة الرسمية</TabsTrigger>
        <TabsTrigger value="supreme_court">المحكمة العليا</TabsTrigger>
        <TabsTrigger value="constitution">الدستور</TabsTrigger>
      </TabsList>


      <TabsContent value="conseil">
        <Card>
          <CardHeader>
            <CardTitle>الإجتهاد القضائي</CardTitle>
            <CardDescription>الإجتهاد القضائي</CardDescription>
          </CardHeader>
          <CardContent>
            <ConseilSearchForm query={query} />
          </CardContent>
        </Card>
      </TabsContent>


      <TabsContent value="laws">
        <Card>
          <CardHeader>
            <CardTitle>الجريدة الرسمية</CardTitle>
            <CardDescription>الجريدة الرسمية</CardDescription>
          </CardHeader>
          <CardContent>
            <LawSearchForm query={query} />
          </CardContent>
        </Card>
      </TabsContent>


      <TabsContent value="supreme_court">
        <Card className="bg-slate-100">
          <CardHeader>
            <CardTitle>المحكمة العليا</CardTitle>
            <CardDescription>المحكمة العليا</CardDescription>
          </CardHeader>
          <CardContent>
            <SupremeCourtSearchForm query={query} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="constitution">
        <Card className="bg-slate-100">
          <CardHeader>
            <CardTitle>الدستور</CardTitle>
            <CardDescription>الدستور</CardDescription>
          </CardHeader>
          <CardContent>
            <ConstitutionSearchForm query={query} /> 
          </CardContent>
        </Card>
      </TabsContent>


    </Tabs>
  );
}
