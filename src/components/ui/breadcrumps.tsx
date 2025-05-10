import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadCrumpsProps = {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
};

const BreadCrumps = ({ breadcrumbs }: BreadCrumpsProps) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, idx) => (
            <div
              className="flex items-center gap-2"
              key={breadcrumb.label + idx.toString()}
            >
              <BreadcrumbItem>
                {!breadcrumb.href ? (
                  <span>{breadcrumb.label}</span>
                ) : (
                  <BreadcrumbLink to={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {idx !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumps;
