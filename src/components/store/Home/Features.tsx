import { features } from "@/data";

const Features = () => {
  return (
    <section className="border-t">
      <div className="wrapper">
        <ul className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <feature.icon className="size-8" />
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
