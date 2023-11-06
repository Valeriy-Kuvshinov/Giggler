function _buildPipeline(filterBy) {
  const pipeline = []

  const match = {
    $match: {},
  }

  const { search, cat, level, min, max, tag, time } = filterBy

  if (search) {
    match.$match.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  if (cat) {
    match.$match.category = { $regex: cat, $options: 'i' }
  }
  
  if (tag) {
    match.$match.tags = { $regex: tag, $options: 'i' }
  }
  
  if (time) {
    match.$match.daysToMake = { $regex: time, $options: 'i' }
  }
  
  if (min) {
    match.$match.price.$gte = parseInt(min)
  }

  if (max) {
    match.$match.price.$lte = parseInt(max)
  }

  if (level) {
    pipeline.push({
      $lookup: {
        from: 'user',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'userDetails',
      },
    })

    pipeline.push({
      $match: {
        'userDetails.level': { $regex: level, $options: 'i' },
      },
    })
  }

  const itemsPerPage = 12
  const skipCount = (filterBy.page - 1) * itemsPerPage
  pipeline.push({
    $skip: skipCount,
  })
  pipeline.push({
    $limit: itemsPerPage,
  })

  if (Object.keys(match.$match).length > 0) {
    pipeline.push(match)
  }

  return pipeline
}
