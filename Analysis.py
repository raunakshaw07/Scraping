import pandas as pd

trimmer = pd.read_csv('trimmers.csv', index_col=0)

trimmer.to_html('trimmers.html')
