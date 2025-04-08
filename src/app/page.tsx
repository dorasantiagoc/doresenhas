import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { recipes as staticRecipes } from '@/data/recipes';

interface Recipe {
  title: string,
  image: string,
  autor: string,
  description: string,
  link: string,
  id: string,
  modal: string
  modal2: string
  modal3: string
}

async function getRecipes(): Promise<Recipe[]> {
  if (process.env.NODE_ENV === 'development') {
    try {
      const result = await fetch('http://localhost:4000/recipes', {
        next: { revalidate: 0 }
      });
      
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      return result.json();
    } catch (error) {
      console.warn('Failed to fetch from API, falling back to static data:', error);
      return staticRecipes;
    }
  }
  return staticRecipes;
}


export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main>
      <div className="grid grid-cols-2 gap-8">
        {recipes.map(recipe => (
          <Card key={recipe.id} className="card flex flex-col justify-between">
            <CardHeader className="header flex-row gap-4 items-center">
              <div className="cover">
                <Image 
                  src={`/img/${recipe.image}`}
                  alt={`Cover of ${recipe.title}`}
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <CardTitle className="tittle">{recipe.title}</CardTitle>
                <CardDescription className="autor">
                  {recipe.autor}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="content">
              <CardDescription className="description">
                <p>
                  {recipe.description}
                </p>
              </CardDescription>
            </CardContent>
            <CardFooter className="footer flex justify-between">
              <Dialog>
                <DialogTrigger className="button bg-primary">ler mais</DialogTrigger>
                <DialogContent className="modalcard">
                  <DialogHeader className="modalheader">
                    <DialogTitle>📖 resenha de {recipe.title}</DialogTitle>
                    <DialogDescription className="modaltext">
                      <b>nome do livro:</b> {recipe.title} <br/>
                      <b>nome de autore:</b> {recipe.autor} <br/> <br/>
                      {recipe.modal} <br/> <br/>
                      {recipe.modal2} <br/> <br/>
                      {recipe.modal3}
                    </DialogDescription>
                  </DialogHeader>
                <DialogFooter>
                  <Button type="submit" className="button bg-primary">
                  <a href={recipe.link}>resenha no instagram</a>
                  </Button>
                </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
