import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";

function ActivityCard() {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Register</Button>
        <Button>Login</Button>
      </CardFooter>
      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-green-500 to-transparent"
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
  const projectId = 'PVT_kwDOAKejWs4A4QJ3'; // 替换为你的 ProjectV2 ID

  const query = `
query {                                                                                                     
    node(id: "PVT_kwDOAKejWs4A4QJ3") {                                                                                                                                    
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
    cache: 'no-store', // 保证每次最新
  });

  const json = await res.json();
  console.log(json);
  return json.data.node.items.nodes;
  // return [] as Item[];
}

export default async function ProjectPage() {
  const items = await fetchProjectItems();

  const groupedItems = items.reduce((acc, item) => {
    const activityType = item.fieldValues?.nodes?.find((field) => field?.field?.name === 'Activity')?.name || 'Unknown';
    
    if (!acc[activityType]) {
      acc[activityType] = [];
    }
    acc[activityType].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Items</h1>
      {Object.entries(groupedItems).map(([activityType, items]) => (
        <div key={activityType} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{activityType}</h2>
          <Carousel className="max-w-2xl">
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={item.id} className="md:basis-full lg:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Item {index + 1}</h3>
                      {item.content && (
                        <div className="mb-2">
                          <p className="text-xl font-bold">{item.content.title}</p>
                          {item.content.body && (
                            <>
                              <p className="font-bold mt-2">Body:</p>
                              <p className="text-sm">{item.content.body}</p>
                            </>
                          )}
                          {item.content.assignees && item.content.assignees?.nodes?.length > 0 && (
                            <>
                              <p className="font-bold mt-2">Assignees:</p>
                              <ul className="text-sm">
                                {item.content.assignees.nodes.map((a) => (
                                  <li key={a.login}>{a.login}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                      <div className="mt-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          {item.fieldValues.nodes.map((field, idx) => (
                            field.field && (
                              <div key={idx} className="contents">
                                <dt className="font-bold text-right pr-2">{field.field.name}</dt>
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
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
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