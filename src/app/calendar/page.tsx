"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BorderBeam } from "@/components/magicui/border-beam";

function ActivityCard({ item }: { item: Item }) {
  const status = item.fieldValues?.nodes?.find((field) => field?.field?.name === 'Status')?.name || 'Todo';
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'from-transparent via-green-500 to-transparent';
      case 'todo':
        return 'from-transparent via-purple-500 to-transparent';
      default:
        return 'from-transparent via-foreground to-transparent';
    }
  };

  return (
    <Card className="relative w-full overflow-hidden">
      <CardHeader className="pb-2">
        {item.content && (
          <div>
            <CardTitle className="text-2xl">{item.content.title}</CardTitle>
            {item.content.body && (
              <CardDescription className="mt-2">
                {item.content.body}
              </CardDescription>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="px-4 py-1">
        {item.content?.assignees && item.content.assignees?.nodes?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground">Assignees:</p>
            <ul className="text-sm">
              {item.content.assignees.nodes.map((a) => (
                <li key={a.login}>{a.login}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {item.fieldValues.nodes.map((field, idx) => (
              field.field && (
                <div key={idx} className="contents">
                  <dt className="font-bold pr-2 text-muted-foreground">{field.field.name}</dt>
                  <dd className="text-primary pl-2">{
                    field.__typename === 'ProjectV2ItemFieldTextValue' && field.text ||
                    field.__typename === 'ProjectV2ItemFieldDateValue' && field.date ||
                    field.__typename === 'ProjectV2ItemFieldSingleSelectValue' && field.name
                  }</dd>
                </div>
              )
            ))}
          </dl>
        </div>
      </CardContent>
      <BorderBeam
        duration={2}
        size={300}
        reverse
        className={getStatusColor(status)}
      />
    </Card>
  );
}

type FieldValue = {
  __typename: string;
  field: { name: string };
  text?: string;
  date?: string;
  name?: string;
};

type Assignee = { login: string };

type Item = {
  id: string;
  fieldValues: { nodes: FieldValue[] };
  content: {
    __typename: string;
    title: string;
    body?: string;
    assignees?: { nodes: Assignee[] };
  } | null;
};

async function fetchProjectItems(): Promise<Item[]> {
  const token = process.env.GH_PROJ_TOKEN;
  if (!token) {
    throw new Error('GitHub token is not defined');
  }
  const projectId = 'PVT_kwDOAKejWs4A4QJ3';

  const query = `
query {                                                                                                     
    node(id: "${projectId}") {                                                                                                                                    
        ... on ProjectV2 {                                                                                                                                                
            items {                                                                                                                                                       
                nodes {                                                                                                                                                   
                    id                                                                                                                                                    
                    fieldValues(first: 8) {                                                                                                                               
                        nodes {                                                                                                                                           
                            ... on ProjectV2ItemFieldTextValue {                                                                                                          
                                text                                                                                                                                      
                                __typename
                                field {                                                                                                                                   
                                    ... on ProjectV2FieldCommon {                                                                                                         
                                        name                                                                                                                              
                                    }                                                                                                                                     
                                }                                                                                                                                         
                            }                                                                                                                                             
                            ... on ProjectV2ItemFieldDateValue {                                                                                                          
                                date                                                                                                                                      
                                __typename
                                field {                                                                                                                                   
                                    ... on ProjectV2FieldCommon {                                                                                                         
                                        name                                                                                                                              
                                    }                                                                                                                                     
                                }                                                                                                                                         
                            }                                                                                                                                             
                            ... on ProjectV2ItemFieldSingleSelectValue {                                                                                                  
                                name
                                __typename
                                field {
                                    ... on ProjectV2FieldCommon {
                                    name
                                    }
                                }
                            }
                        }
                    }
                    content {
                        ... on DraftIssue {
                            title
                            body
                        }
                        ... on Issue {
                            title
                            assignees(first: 10) {
                                totalCount 
                                nodes {
                                    login
                                    avatarUrl
                                }
                            }
                        }
                        ... on PullRequest {
                            title
                            assignees(first: 10) {
                                nodes {
                                    login
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate: 60 // Revalidate every minute
    }
  });

  const json = await res.json();
  console.log(json);
  return json.data.node.items.nodes;
}

export default async function ProjectPage() {
  const items = await fetchProjectItems();

  const groupedItems = items.reduce((acc, item) => {
    const activityType = item.fieldValues?.nodes?.find((field) => field?.field?.name === 'Activity')?.name || 'Others';

    if (!acc[activityType]) {
      acc[activityType] = [];
    }
    acc[activityType].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  // Sort the entries so that "Others" appears last
  const sortedEntries = Object.entries(groupedItems).sort(([a], [b]) => {
    if (a === 'Others') return 1;
    if (b === 'Others') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="p-6 flex flex-col w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-12">Recent Activities</h1>
        {sortedEntries.map(([activityType, items]) => (
          <div key={activityType} className="mb-8 w-full max-w-2xl flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-center">{activityType}</h2>
            <Carousel className="max-w-2xl mb-10">
              <CarouselContent>
                {items.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-full lg:basis-1/2 p-4">
                    <ActivityCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" variant="default" />
              <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" variant="default" />
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function CalendarPage() {
//   return (
//     <main className="flex flex-col items-center justify-center p-24 gap-10">
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//         Activities Calendar
//       </h1>
//       <ActivityCard />
//     </main>
//   )
// }