import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //Trying search
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  // Sort
  sort() {
    const sortBy = this.query.sortBy as string | undefined;
    console.log(sortBy);
    const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
    console.log('from Builder',sortOrder);
    if (sortBy) {
      this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    }
    return this;
  }
  // Filter
  filter() {
    const filter = this.query.filter as string | undefined;
    if (filter) {
      this.modelQuery = this.modelQuery.find({
        author: filter,
      } as FilterQuery<T>);
    }
    return this;
  }
}

export default QueryBuilder;
